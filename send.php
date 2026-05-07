<?php
/* ============================================================
   Major1 — send.php
   Backend formularza kontaktowego.
   Wysyła wiadomość na biuro@major1.pl, obsługuje AJAX (JSON)
   oraz klasyczny submit (przekierowanie z parametrem ?sent=1).
   ============================================================ */

declare(strict_types=1);

// ------------------------------------------------------------
// 1) KONFIGURACJA — DOSTOSUJ PRZED WGRANIEM NA PRODUKCJĘ
// ------------------------------------------------------------
const MAIL_TO        = 'biuro@major1.pl';
const MAIL_FROM      = 'noreply@major1.pl';      // adres FROM zgodny z domeną (SPF/DKIM)
const MAIL_FROM_NAME = 'Formularz major1.pl';
const SUBJECT_PREFIX = '[major1.pl] Nowe zapytanie';

// Anti-spam — limit zapytań z jednego IP.
const RATE_LIMIT_WINDOW   = 600;   // 10 minut
const RATE_LIMIT_MAX      = 5;     // max 5 wysyłek / 10 min
const RATE_LIMIT_DIR      = __DIR__ . '/.rate-limit';

// Strona do redirectu po success/error (tylko dla non-AJAX).
const REDIRECT_OK    = 'kontakt.html?sent=1#form-heading';
const REDIRECT_FAIL  = 'kontakt.html?error=1#form-heading';

// ------------------------------------------------------------
// 2) NARZĘDZIA
// ------------------------------------------------------------
function wantsJson(): bool {
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    return stripos($accept, 'application/json') !== false
        || (($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'XMLHttpRequest');
}

function respond(bool $ok, string $msg, int $http = 200): void {
    http_response_code($http);
    if (wantsJson()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $msg], JSON_UNESCAPED_UNICODE);
    } else {
        $loc = $ok ? REDIRECT_OK : REDIRECT_FAIL;
        header('Location: ' . $loc, true, 303);
        echo $msg;
    }
    exit;
}

function clean(string $v, int $max = 500): string {
    $v = trim($v);
    // strip CR/LF — ochrona przed header injection
    $v = str_replace(["\r", "\n", "%0A", "%0D"], '', $v);
    if (mb_strlen($v) > $max) {
        $v = mb_substr($v, 0, $max);
    }
    return $v;
}

function clientIp(): string {
    // Uwaga: jeśli za reverse proxy / Cloudflare — zaufaj odpowiednim nagłówkom dopiero
    // po skonfigurowaniu trusted_proxies. Dla zwykłego shared hostingu REMOTE_ADDR wystarczy.
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function rateLimit(string $ip): bool {
    if (!is_dir(RATE_LIMIT_DIR)) {
        @mkdir(RATE_LIMIT_DIR, 0700, true);
        @file_put_contents(RATE_LIMIT_DIR . '/.htaccess', "Require all denied\n");
    }
    $key  = preg_replace('/[^a-z0-9._-]/i', '_', $ip);
    $file = RATE_LIMIT_DIR . '/' . $key . '.json';
    $now  = time();

    $data = ['ts' => []];
    if (is_file($file)) {
        $raw = @file_get_contents($file);
        if ($raw) {
            $parsed = json_decode($raw, true);
            if (is_array($parsed) && isset($parsed['ts'])) $data = $parsed;
        }
    }
    // odsiej stare wpisy
    $data['ts'] = array_values(array_filter($data['ts'], static function ($t) use ($now) {
        return ($now - (int)$t) < RATE_LIMIT_WINDOW;
    }));
    if (count($data['ts']) >= RATE_LIMIT_MAX) {
        return false;
    }
    $data['ts'][] = $now;
    @file_put_contents($file, json_encode($data));
    return true;
}

// ------------------------------------------------------------
// 3) ROUTING
// ------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// 3a) HONEYPOT — jeśli bot wypełnił, udajemy sukces (nie wysyłamy maila).
if (!empty($_POST['website'])) {
    respond(true, 'OK');
}

// 3b) RATE LIMIT
if (!rateLimit(clientIp())) {
    respond(false, 'Zbyt wiele żądań — spróbuj za kilka minut.', 429);
}

// 3c) WALIDACJA
$name    = clean((string)($_POST['name']    ?? ''), 120);
$phone   = clean((string)($_POST['phone']   ?? ''), 32);
$email   = clean((string)($_POST['email']   ?? ''), 160);
$service = clean((string)($_POST['service'] ?? ''), 64);
$message = trim((string)($_POST['message']  ?? ''));
$consent = !empty($_POST['consent']);

$errors = [];
if (mb_strlen($name)    < 2)                              $errors[] = 'name';
if (!preg_match('/^[0-9 +\\-()]{7,20}$/', $phone))        $errors[] = 'phone';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))           $errors[] = 'email';
if (!in_array($service, [
    'ochrona-fizyczna', 'ochrona-vip', 'systemy-zabezpieczen', 'konwoje', 'inne'
], true))                                                  $errors[] = 'service';
if (mb_strlen($message) < 10 || mb_strlen($message) > 3000) $errors[] = 'message';
if (!$consent)                                             $errors[] = 'consent';

if ($errors) {
    respond(false, 'Walidacja: ' . implode(',', $errors), 422);
}

// Service label do mailu
$serviceLabels = [
    'ochrona-fizyczna'      => 'Ochrona fizyczna',
    'ochrona-vip'           => 'Ochrona VIP',
    'systemy-zabezpieczen'  => 'Systemy zabezpieczeń',
    'konwoje'               => 'Konwoje wartości',
    'inne'                  => 'Inne / konsultacja',
];
$serviceLabel = $serviceLabels[$service];

// ------------------------------------------------------------
// 4) BUDOWA WIADOMOŚCI
// ------------------------------------------------------------
$ip      = clientIp();
$ua      = clean((string)($_SERVER['HTTP_USER_AGENT'] ?? '-'), 300);
$ts      = (new DateTimeImmutable('now', new DateTimeZone('Europe/Warsaw')))->format('Y-m-d H:i:s');
$subject = SUBJECT_PREFIX . ' — ' . $serviceLabel;

// Plain-text body (najbardziej kompatybilny z filtrami antyspamowymi)
$body  = "NOWE ZAPYTANIE Z FORMULARZA major1.pl\n";
$body .= "===========================================\n\n";
$body .= "Imię i nazwisko : {$name}\n";
$body .= "Telefon         : {$phone}\n";
$body .= "E-mail          : {$email}\n";
$body .= "Usługa          : {$serviceLabel}\n";
$body .= "Zgoda RODO      : TAK\n";
$body .= "\n--- Wiadomość ---\n\n";
$body .= $message . "\n\n";
$body .= "===========================================\n";
$body .= "Wysłane         : {$ts} (Europe/Warsaw)\n";
$body .= "IP              : {$ip}\n";
$body .= "User-Agent      : {$ua}\n";

// Nagłówki — mb_encode_mimeheader żeby polskie znaki w temacie/nadawcy nie poszły jako ?=
$encodedSubject = mb_encode_mimeheader($subject, 'UTF-8', 'B');
$fromHeader     = mb_encode_mimeheader(MAIL_FROM_NAME, 'UTF-8', 'B') . ' <' . MAIL_FROM . '>';

$headers   = [];
$headers[] = 'From: ' . $fromHeader;
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: major1-form/1.0';
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';

// ------------------------------------------------------------
// 5) WYŚLIJ
// ------------------------------------------------------------
$ok = @mail(MAIL_TO, $encodedSubject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);

if (!$ok) {
    // Log — ułatwia diagnostykę bez palenia danych użytkownika do przeglądarki.
    @error_log('[major1-form] mail() failed for ' . $email . ' from ' . $ip);
    respond(false, 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.', 500);
}

respond(true, 'Dziękujemy — wiadomość wysłana.');

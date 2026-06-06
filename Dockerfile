FROM caddy:2-alpine

# Configurazione del server
COPY Caddyfile /etc/caddy/Caddyfile

# File statici del sito (HTML, CSS, JS, immagini)
COPY . /srv

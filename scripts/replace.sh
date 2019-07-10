
while read LINE; do
    key="$(cut -d'=' -f1 <<<"$LINE")"
    value="$(cut -d'=' -f2 <<<"$LINE")"
    sed -i '' -e "s/$key/$value/g" traefik.toml
done < ../.env.local

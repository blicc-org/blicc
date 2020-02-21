FROM redis:5.0.7

COPY healthcheck.sh .

HEALTHCHECK CMD ["chmod", "+x", "healthcheck.sh"]

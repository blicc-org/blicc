FROM redis:5.0.8

COPY healthcheck.sh /root/

HEALTHCHECK CMD ["chmod", "+x", "/root/healthcheck.sh"]

FROM redis:5.0.7

COPY healthcheck.sh /root/

HEALTHCHECK CMD ["chmod", "+x", "/root/healthcheck.sh"]

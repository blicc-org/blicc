FROM rabbitmq:3.8.3-management

HEALTHCHECK --interval=30s --timeout=240s --start-period=30s --retries=10 CMD [ "CMD", "nc", "-z", "localhost", "5672" ]

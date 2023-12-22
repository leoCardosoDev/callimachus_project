FROM node:21-slim

USER admin

WORKDIR /home/admin/app

CMD ["tail", "-f", "/dev/null"]

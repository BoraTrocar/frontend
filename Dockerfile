# Use a imagem de um servidor web, por exemplo, Nginx
FROM nginx:alpine

# Copie os arquivos do seu projeto para o diretório do servidor web do Nginx
COPY ./src /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

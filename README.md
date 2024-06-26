# spyxel

Spyxel is a simple tool based on the "invisible pixel" principle.

> An _"Invisible Pixel"_ is a small, transparent digital image (often 1x1 pixel).
> It is used on certain websites and/or in e-mails to collect user information
> (IP, location, date/time, etc.).

---

<h3 align="center">Disclaimer</h3>
This project is only for educational purpose.
Any actions and/or activities related to Spyxel is solely your responsibility.
I am not responsible for any misuse of this project.

## Install

The first step is to clone this repository:

```shell
git clone https://github.com/Koalhack/spyxel.git
```

> this project require NodeJS to be install

And the final step is to run the script

```shell
node ./server/index.js
```

your script will launch a server at the port `8080`.

## Usage

The usage of this tool, is pretty easy you just have to host you program online and link it to a websites or in a mail.

```
<img src="https://<your_custom_domain>" />
```

> You can also use in combination of this tool, [cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
>
> ```shell
> cloudflared tunnel --url http:localhost:8080
> ```

## Docker

this project is provided with a `Dockerfile`, you can build a image and run **Spyxel** on you own Docker container

Let's start by creating your Docker Image

```shell
docker build -t <your_custom_image_name> .
```

You can also use in combination of this tool, [cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)

use my `docker-compose.yml` file and run the following command:

```shell
docker-compose up -d
```

> For a correct work of my docker-compose, you have to build your image with the following name:
>
> ```shell
> docker build -t koalhack/spyxel .
> ```
>
> Or you can edit my `docker-compose.yml` file to match your image

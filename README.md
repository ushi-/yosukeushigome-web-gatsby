# yosukeushigome-web-gatsby

## About this repo

This repo contains the source code of Yosuke Ushigome's website.

## Tech stack

* Static site generator: [Gatsby](https://www.gatsbyjs.org/)
* View framework: [React](https://facebook.github.io/react/)
* CSS framework: [Bulma](http://bulma.io/)
* Hosting: [Surge.sh](http://surge.sh/)

## Rules in creating pages

### Japanese text

Wrap paragraphs written in Japanese with `<div class="ja" />`. English texts (single-byte texts) inserted within this `div` are automatically wrapped with `<span class="single-byte" />`.

### Image size

| Image type        | Aspect ratio  | Min width |
| ---               | ---           | ---       |
| Featured Image    | 1:1           | 1344 px   |
| Carousel Image    | 16:9          | 1344 px   |
| Landscape Image   | 3:2           | 888 px    |
| Portrait Image    | 3:4           | ??? px    |

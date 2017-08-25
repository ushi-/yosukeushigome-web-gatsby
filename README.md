# yosukeushigome-web-gatsby

## About this repo

This repo contains the source code of Yosuke Ushigome's website.

Note: This repo does NOT contain the image assets of projects.

## Tech stack

* [Gatsby](https://www.gatsbyjs.org/) <-- Static site generator
* [React](https://facebook.github.io/react/) <-- View framework
* [Bulma](http://bulma.io/) <-- CSS framework
* [Formspree](https://formspree.io/) <-- HTML forms
* [Surge.sh](http://surge.sh/) <-- Hosting

## Rules in creating pages

### Japanese text

Wrap paragraphs written in Japanese with `<div class="ja" />`.

English texts (single-byte texts) inserted within it are automatically wrapped with `<span class="single-byte" />`.

### Image size

| Image type        | Aspect ratio  | Min width |
| ---               | ---           | ---       |
| Featured Image    | 1:1           | 1600 px   |
| Carousel Image    | 16:9          | 1344 px   |
| Landscape Image   | 3:2           | 888 px    |
| Portrait Image    | 3:4           | 720 px    |

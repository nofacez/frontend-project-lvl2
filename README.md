### Hexlet tests and linter status:
[![Actions Status](https://github.com/nofacez/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/nofacez/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/00420ad8aa4a76c099b7/maintainability)](https://codeclimate.com/github/nofacez/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/00420ad8aa4a76c099b7/test_coverage)](https://codeclimate.com/github/nofacez/frontend-project-lvl2/test_coverage)
![Super-Linter](https://github.com/nofacez/frontend-project-lvl1/workflows/lint/badge.svg)

## Что это? 
  Это генератор отличий json\yml файлов. Для того, чтобы им воспользоваться нужно:
  1) Склонировать репозиторий к себе
  2) Истановить зависимости командой ```make install```
  3) ```node bin/gendiff.js [filepath1] [filepath2] (formatter[stylish/plain/json])```
  4) Проект также можно установить в виде зависимости и использовать у себя в проекте:
  ``````
  
    import gendiff from 'src/finddiff.js'
    
    gendiff(filepath1: string, filepath2: string, formatter: [stylish/plain/json])
    
  ``````
## Чему я научился?
  * Подготавливать проект в виде npm package
  * Работать с json/yml
  * Использовать commander для работы с CLI

## Примеры использования:
[![asciicast](https://asciinema.org/a/G1N6G3nTF6XboMlNZ1uv7x2k9.svg)](https://asciinema.org/a/G1N6G3nTF6XboMlNZ1uv7x2k9)
[![asciicast Json](https://asciinema.org/a/Svt5QLRMlecQT0tGTZxSSKlWi.svg)](https://asciinema.org/a/Svt5QLRMlecQT0tGTZxSSKlWi)
[![asciicast Yml](https://asciinema.org/a/HtU4ny4BTxy1XjSNTcS4NfhiI.svg)](https://asciinema.org/a/HtU4ny4BTxy1XjSNTcS4NfhiI)
[![asciicast](https://asciinema.org/a/389398.svg)](https://asciinema.org/a/389398)
[![asciicast](https://asciinema.org/a/SrrdZD58CvVRC5iHPX5PAP0uD.svg)](https://asciinema.org/a/SrrdZD58CvVRC5iHPX5PAP0uD)

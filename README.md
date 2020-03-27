![.github/workflows/actions.yml](https://github.com/anuveyatsu/covid-19-kz/workflows/.github/workflows/actions.yml/badge.svg?branch=master)

## Data

Data is in CSV format and updated hourly. It is sourced from http://coronavirus2020.kz/ website which claims to be the official source in Kazakhstan Republic.

## Preparation

Fetch the data:

```bash
cd scripts
yarn # or `npm i`
node process.js
```

## License

This dataset is licensed under the Open Data Commons [Public Domain and Dedication License][pddl].

[pddl]: https://www.opendatacommons.org/licenses/pddl/1-0/

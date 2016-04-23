The spec is written in [bikeshed](https://github.com/tabatkins/bikeshed) preprocessor.

## Generating HTML

To generate an HTML version of spec, run the following command in this directory:

```sh
curl https://api.csswg.org/bikeshed/ -F file=@index.bs -F force=1 > index.html
```

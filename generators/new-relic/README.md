# new-relic

Installs and configures New Relic monitoring and adds git-crypt config.

## Usage

Run generator from root of the project that needs New Relic setup.

```
$ yo springworks:new-relic
```

## Result

- `newrelic.js` in root of project without the license key. Must be added manually.
- `.gitattributes` in root of project with config for encrypting `newrelic.js`. Remember to initiate git-crypt and commit `.gitattributes` before committing `newrelic.js` for the encryption to happen.

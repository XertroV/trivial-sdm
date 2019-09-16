# cba-sdm-example

A refactor of the PoC to use best practices (early draft).

## Getting Started

For local dev (with support for building + deploying) please make sure you have installed:

* node (v10+) + npm
* docker
* minikube (other kubernetes impls should work too - if you do use minikube configure this as per below before running `minikube start`)

### Configuring docker and minikube

If you don't have (or want) virtualbox installed, and are running linux, run this to use KVMs: `minikube config set vm-driver kvm2`

You might need to set the default memory and CPUs to be higher than default (1GB and 1 respectively): `minikube config set memory 8196; minikube config set cpus 8`

Proxies can be quite frustrating to configure. Some links:

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [minikube](https://minikube.sigs.k8s.io/docs/start/) -- [setup](https://kubernetes.io/docs/tutorials/hello-minikube/) -- [proxy1](https://minikube.sigs.k8s.io/docs/reference/networking/proxy/); [proxy2](https://kubernetes.io/docs/setup/learning-environment/minikube/#using-minikube-with-an-http-proxy); [proxy3](https://codefarm.me/2018/08/09/http-proxy-docker-minikube/); [docs](https://minikube.sigs.k8s.io/docs/); [using kvm](https://computingforgeeks.com/how-to-run-minikube-on-kvm/)

You'll want to have the CNTLM local proxy set up. In relevant terminals (suggestion: add to `~/.bashrc` or equiv):

```bash
export http{,s}_proxy=http://127.0.0.1:3128
export HTTP{,S}_PROXY=http://127.0.0.1:3128
export {NO_PROXY,no_proxy}=localhost,127.0.0.1,::1
```

To add this globally to all shells:

```bash
cat | sudo tee -a /etc/profile << EOF
export http{,s}_proxy=http://127.0.0.1:3128
export HTTP{,S}_PROXY=http://127.0.0.1:3128
export {NO_PROXY,no_proxy}=localhost,127.0.0.1,::1
EOF
```

In a new terminal session you can confirm the global config works via `env | grep -i proxy` (should return 6 lines matching the above)

You'll want to add these variables to `docker`'s environment too. For linux this is easy ([instructions](https://codefarm.me/2018/08/09/http-proxy-docker-minikube/)), if you do this on macos please update this readme with instructions.

### Developing

To deploy to your local minikube cluster you need to ensure `eval $(minikube docker-env)` to set. If you're using zsh with autoenv you'll get this automatically via the `.in` file (and will be unset when you `cd` out via `.out`)

# Original README (via empty-sdm)

[![atomist sdm goals](http://badge.atomist.com/T29E48P34/atomist-seeds/empty-sdm/c796f715-67c3-48ae-8b7c-45c0fd31443f)](https://app.atomist.com/workspace/T29E48P34)
[![npm version](https://img.shields.io/npm/v/@atomist-seeds/empty-sdm.svg)](https://www.npmjs.com/package/@atomist-seeds/empty-sdm)

The simplest possible [Atomist][atomist] software delivery machine
(SDM).

Software delivery machines enable you to control your delivery process
in code.  Think of it as an API for your software delivery.  See the
[Atomist documentation][atomist-doc] for more information on the
concept of a software delivery machine and how to create and develop
an SDM.

[atomist-doc]: https://docs.atomist.com/ (Atomist Documentation)

## Getting started

See the [Developer Quick Start][atomist-quick] to jump straight to
creating an SDM.

[atomist-quick]: https://docs.atomist.com/quick-start/ (Atomist - Developer Quick Start)

## Contributing

Contributions to this project from community members are encouraged
and appreciated. Please review the [Contributing
Guidelines](CONTRIBUTING.md) for more information. Also see the
[Development](#development) section in this document.

## Code of conduct

This project is governed by the [Code of
Conduct](CODE_OF_CONDUCT.md). You are expected to act in accordance
with this code by participating. Please report any unacceptable
behavior to code-of-conduct@atomist.com.

## Documentation

Please see [docs.atomist.com][atomist-doc] for
[developer][atomist-doc-sdm] documentation.

[atomist-doc-sdm]: https://docs.atomist.com/developer/sdm/ (Atomist Documentation - SDM Developer)

## Connect

Follow [@atomist][atomist-twitter] and [the Atomist blog][atomist-blog].

[atomist-twitter]: https://twitter.com/atomist (Atomist on Twitter)
[atomist-blog]: https://blog.atomist.com/ (The Official Atomist Blog)

## Support

General support questions should be discussed in the `#support`
channel in the [Atomist community Slack workspace][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist-seeds/empty-sdm/issues

## Development

You will need to install [Node.js][node] to build and test this
project.

[node]: https://nodejs.org/ (Node.js)

### Build and test

Install dependencies.

```
$ npm install
```

Use the `build` package script to compile, test, lint, and build the
documentation.

```
$ npm run build
```

### Release

Releases are handled via the [Atomist SDM][atomist-sdm].  Just press
the 'Approve' button in the Atomist dashboard or Slack.

[atomist-sdm]: https://github.com/atomist/atomist-sdm (Atomist Software Delivery Machine)

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ (Atomist - How Teams Deliver Software)
[slack]: https://join.atomist.com/ (Atomist Community Slack)

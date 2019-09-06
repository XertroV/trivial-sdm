FROM atomist/sdm-base:0.3.0

# RUN apt-get update && apt-get install -y \
#         openjdk-8-jdk-headless maven \
#         bundler \
#         zlib1g-dev \
#         golang-go \
#         gradle \
#     && rm -rf /var/lib/apt/lists/*

# ENV LEIN_ROOT true
# RUN curl -sL -o /usr/local/bin/lein https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein \
#     && chmod +x /usr/local/bin/lein

# RUN curl https://htmltest.wjdp.uk | sudo bash -s -- -b /usr/local/bin

RUN npm i -g npm-check-updates

COPY package.json package-lock.json ./

RUN npm ci \
    && npm cache clean --force

COPY . ./
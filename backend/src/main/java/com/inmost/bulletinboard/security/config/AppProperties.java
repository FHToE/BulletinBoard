package com.inmost.bulletinboard.security.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Auth auth = new Auth();

    public static class Auth {
        private String tokenSecret;
        private long tokenExpirationMsec;
        private long refreshExpirationMsec;

        public String getTokenSecret() {
            return tokenSecret;
        }

        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

        public long getRefreshExpirationMsec() {
            return refreshExpirationMsec;
        }

        public long getTokenExpirationMsec() {
            return tokenExpirationMsec;
        }

        public void setRefreshExpirationMsec(long refreshExpirationMsec) {
            this.refreshExpirationMsec = refreshExpirationMsec;
        }

        public void setTokenExpirationMsec(long tokenExpirationMsec) {
            this.tokenExpirationMsec = tokenExpirationMsec;
        }
    }

    public Auth getAuth() {
        return auth;
    }
}

package com.bank.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.JwtException;
import java.security.Key;

public class JwtUtil {
    // Update the secret key to be Base64 encoded
    private static final String SECRET_KEY = "bXktMzItY2hhcmFjdGVyLXVsdHJhLXNlY3VyZS1hbmQtdWx0cmEtbG9uZy1zZWNyZXQ="; // Base64-encoded version of your secret

    // Get the signing key from the base64-encoded secret key
    private static Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Validate the JWT token and return the claims
    public static Claims validateToken(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

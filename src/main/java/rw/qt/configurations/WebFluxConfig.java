package rw.qt.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
// @EnableWebFlux // No need => "spring-boot-starter-webflux" dependency
public class WebFluxConfig {

    final static int MAX_BUFFER_SIZE_JSON_RESPONSE = 200 * 1024 * 1024; // 200MB

    final ExchangeStrategies strategies = ExchangeStrategies.builder()
            .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(MAX_BUFFER_SIZE_JSON_RESPONSE))
            .build();

    @Value("${qt.interface.baseurl}")
    private String vwpsBaseUrl;

    @Bean
    public WebClient qtWebClient(WebClient.Builder webClientBuilder) {
        return webClientBuilder
                .clone()
                .baseUrl(vwpsBaseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .exchangeStrategies(strategies)
                .build();
    }
}

package rw.qt.service.impl;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import rw.qt.dto.UserDTO;
import rw.qt.service.PortalService;

@Service
public class PortalServiceImpl implements PortalService {

    @Autowired
    private WebClient vwpsWebClient;

    @Override
    public List<UserDTO> findAll() {

        UserDTO[] data = vwpsWebClient.get()
                .uri("/todos")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .bodyToMono(UserDTO[].class).block();

        return Arrays.asList(data);
    }

    @Override
    public UserDTO getOne(int id) {
        return vwpsWebClient.get()
                .uri("/todos/" + id)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .bodyToMono(UserDTO.class).block();
    }
}

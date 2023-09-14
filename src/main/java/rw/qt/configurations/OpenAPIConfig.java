package rw.qt.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import java.util.List;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfig {

    @Value("${heritier.openapi.dev-url}")
    private String devUrl;

    @Value("${heritier.openapi.prod-url}")
    private String prodUrl;

    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl(devUrl);
        devServer.setDescription("Local Server");

        Server prodServer = new Server();
        prodServer.setUrl(prodUrl);
        prodServer.setDescription("Server Production");

        Contact contact = new Contact();
        contact.setEmail("ntaganira71@gmail.com");
        contact.setName("Ntaganira Heritier");
        contact.setUrl("https://rw.linkedin.com/in/ntaganira-heritier-a96084123");

        License mitLicense = new License().name("MIT License")
                .url("https://rw.linkedin.com/in/ntaganira-heritier-a96084123");

        Info info = new Info()
                .title("Task Management API (Qt Software Developer Test)")
                .version("1.0")
                .contact(contact)
                .description("This API exposes endpoints for User management and Task Managment.")
                .termsOfService("https://rw.linkedin.com/in/ntaganira-heritier-a96084123")
                .license(mitLicense);

        return new OpenAPI().info(info).servers(List.of(devServer, prodServer));
    }
}

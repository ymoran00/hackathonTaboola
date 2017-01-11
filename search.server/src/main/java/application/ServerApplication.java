package application;

import api.SearchController;
import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
@ComponentScan(basePackageClasses = SearchController.class)
@EnableConfigurationProperties
@Import(SearchConfig.class)
public class ServerApplication {

	private static final Logger logger = Logger.getLogger(ServerApplication.class);

	public static void main(String[] args) {
		ConfigurableApplicationContext app = SpringApplication.run(ServerApplication.class, args);
	}
}

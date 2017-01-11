package application;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import search.service.SearchService;
import search.service.SearchServiceImpl;

/**
 * Created by Guy.g
 * Date: 1/11/2017
 * Time: 2:27 PM
 * Copyright Taboola
 */

@Configuration
public class SearchConfig {

    @Bean
    public SearchService searchService() {
        return new SearchServiceImpl();
    }
}

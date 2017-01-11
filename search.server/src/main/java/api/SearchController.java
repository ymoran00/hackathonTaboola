package api;


import log.LogWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import search.service.SearchService;

/**
 * Created by Guy.g
 * Date: 1/11/2017
 * Time: 12:04 PM
 * Copyright Taboola
 */

@Component
@RestController
@RequestMapping(value="/api")
public class SearchController {

    private static final LogWrapper logger = new LogWrapper(SearchController.class);

    @Autowired
    private SearchService searchService;

    @RequestMapping(value = "/search", method = RequestMethod.POST, produces= MediaType.APPLICATION_JSON_VALUE)
    public String search(@RequestBody String searchText) {
        logger.info("received search [%s].", searchText);
        return "you searched for: " + searchText;
    }
}

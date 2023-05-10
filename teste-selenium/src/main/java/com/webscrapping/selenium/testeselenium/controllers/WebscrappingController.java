package com.webscrapping.selenium.testeselenium.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.webscrapping.selenium.testeselenium.services.WebscrappingService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/")
public class WebscrappingController {


    @Autowired
    private WebscrappingService webscrapping;


    @GetMapping
    public void GetBrowser() {
  
      webscrapping.GetContent();

      //FirefoxDriver driver = firefoxDriver.getFirefoxDriver();  

      //driver.get("https://www.google.com.br");

      //String title = driver.getTitle();
      //System.out.println("\n" + title + "\n");


      //driver.quit();
    } 


    @GetMapping("lista")
    public List GetList() {
      return webscrapping.GetList();
    }
  
}


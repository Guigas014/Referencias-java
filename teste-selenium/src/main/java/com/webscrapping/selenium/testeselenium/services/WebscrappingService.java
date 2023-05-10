  package com.webscrapping.selenium.testeselenium.services;

  import java.time.Duration;
  import java.util.ArrayList;
  import java.util.Arrays;
  import java.util.List;

  import com.google.gson.Gson;

  //import com.webscrapping.selenium.testeselenium.libraries.WebDriverLibrary;

  import org.openqa.selenium.By;
  import org.openqa.selenium.Dimension;
  import org.openqa.selenium.Point;
  import org.openqa.selenium.Rectangle;
  import org.openqa.selenium.WebElement;
  import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.springframework.stereotype.Service;


@Service
public class WebscrappingService {
  
    
    public void GetContent() {
  
      //Abre o navegador
      FirefoxOptions options = new FirefoxOptions()
        .setAcceptInsecureCerts(true)
        .setHeadless(true);
      
      FirefoxDriver firefoxDriver = new FirefoxDriver(options); 


      //Acessa uma página e busca os dados.
      firefoxDriver.get("https://www.google.com.br");

      //Atraso para esperar a página carregar.
      firefoxDriver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

      String title = firefoxDriver.getTitle();

      WebElement text = firefoxDriver.findElement(By.id("SIvCob"));

      String value = text.getText();
      String tag = text.getTagName();
      Rectangle rect = text.getRect();
      Dimension size = text.getSize();
      Class classe = text.getClass();
      Point location = text.getLocation();
      String attribute = text.getAttribute("id");
      String role = text.getDomAttribute("length");   //Funciona??
      String cssValue = text.getCssValue("font-size");

      System.out.println("\n" + title + "\n");
      System.out.println(value + "\n");
      System.out.println(tag + "\n");
      System.out.println(rect + "\n");
      System.out.println(size + "\n");
      System.out.println(classe + "\n");
      System.out.println(location + "\n");
      System.out.println(attribute + "\n");
      System.out.println(role + "\n");
      System.out.println(cssValue + "\n");


      //Fecha o navegador.
      firefoxDriver.quit();
    } 


    public List<List<String>> GetList() {

      //Abre o navegador
      FirefoxOptions options = new FirefoxOptions()
        .setAcceptInsecureCerts(true)
        .setHeadless(true);
      
      FirefoxDriver firefoxDriver = new FirefoxDriver(options); 


      //Acessa uma página e busca os dados.
      firefoxDriver.get("https://www.pciconcursos.com.br/concursos/centrooeste/");

      //Atraso para esperar a página carregar.
      firefoxDriver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));

      //Testando como fazer no caso de um Array
      List<WebElement> list = firefoxDriver.findElements(By.className("ca"));

      //WebElement value = list.get(1);
      //String texto = value.getText();
      //System.out.println("\n" + value + "\n");  //Mostra todo o objeto.

      //Transforma uma string em um Array de string e mostra como json.
      //String[] items = texto.split("\n");     
      //String[] vagasSalario = items[3].split("até");    
      //Gson gson = new Gson();
      //String json = gson.toJson(items);
      //System.out.println("\n" + json + "\n");

      //Pega o tamanho do array.
      Integer length = list.size();
      
      List<List<String>> concursos = new ArrayList<>();

      for (int i = 0; i < length; i++) {
        WebElement value = list.get(i);
        String item = value.getText();

        //System.out.println("\n" + item + "\n");
        //String item = list.get(i).getText();

        if (item.contains("DF")) {
          String[] itemsConcurso = item.split("\n");
          String[] vagasSalario = itemsConcurso[2].split(" até ");


          List<String> concurso = new ArrayList<>();

          concurso.add(itemsConcurso[0]); 
          concurso.add(vagasSalario[0]); 
          
          if (vagasSalario.length > 1) {
            concurso.add(vagasSalario[1]); 
          }

          concurso.add(itemsConcurso[3]); 
          concurso.add(itemsConcurso[4]); 
          concurso.add(itemsConcurso[5]); 

          if (itemsConcurso.length > 6) {
            concurso.add(itemsConcurso[6]); 
          }

          //System.out.println("\n" + concurso + "\n");
          concursos.add(concurso); 
        }
      }


      Integer newLength = concursos.size();
      System.out.println("\n" + newLength + "\n");

      System.out.println("\n" + concursos.get(2).get(0) + "\n");
      System.out.println("\n" + concursos + "\n");


      //String[] concurso = items.get(1).split("\n"); 
      //String[] vagasSalario = concurso[3].split(" até ");    
      //System.out.println("\n" + concurso[0] + "\n");
      //System.out.println("\n" + vagasSalario[0] + "\n");
      //System.out.println("\n" + vagasSalario[1] + "\n");
      

      //Fecha o navegador.
      firefoxDriver.quit();

      return concursos;
    }
}


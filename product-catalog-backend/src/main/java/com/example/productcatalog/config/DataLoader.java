package com.example.productcatalog.config;

import com.example.productcatalog.model.Category;
import com.example.productcatalog.model.Product;
import com.example.productcatalog.repository.CategoryRepository;
import com.example.productcatalog.repository.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Component
public class DataLoader {

    private final CategoryRepository categoryRepository;

    private final ProductRepository productRepository;

    public DataLoader(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void loadData() {
        try {
            ObjectMapper mapper = new ObjectMapper();

            InputStream categoryStream = getClass().getResourceAsStream("/categories.json");
            List<Category> categories = mapper.readValue(categoryStream, new TypeReference<>() {
            });
            Map<String, Category> categoryMap = categoryRepository.saveAll(categories).stream()
                    .collect(java.util.stream.Collectors.toMap(Category::getName, category -> category));

            InputStream productStream = getClass().getResourceAsStream("/products.json");
            List<Map<String, Object>> products = mapper.readValue(productStream, new TypeReference<>() {
            });
            for (Map<String, Object> productData : products) {
                Product product = new Product();
                product.setName((String) productData.get("name"));
                product.setDescription((String) productData.get("description"));
                product.setPrice(new BigDecimal(productData.get("price").toString()));
                product.setImageUrl((String) productData.get("imageUrl"));
                product.setCategory(categoryMap.get(productData.get("category")));
                productRepository.save(product);
            }

            System.out.println("Dummy data loaded successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
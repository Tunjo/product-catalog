package com.example.productcatalog.service;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.HttpEntity;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImgurService {

    @Value("${imgur.client-id}")
    private String clientId;

    public String uploadImage(MultipartFile file) throws IOException {
        String url = "https://api.imgur.com/3/image";

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost post = new HttpPost(url);
            post.setHeader("Authorization", "Client-ID " + clientId);

            HttpEntity entity = MultipartEntityBuilder.create()
                    .addBinaryBody("image", file.getInputStream(), org.apache.hc.core5.http.ContentType.DEFAULT_BINARY, file.getOriginalFilename())
                    .build();

            post.setEntity(entity);

            try (CloseableHttpResponse response = httpClient.execute(post)) {
                String jsonResponse = EntityUtils.toString(response.getEntity());
                JSONObject jsonObject = new JSONObject(jsonResponse);

                if (jsonObject.getBoolean("success")) {
                    return jsonObject.getJSONObject("data").getString("link");
                } else {
                    throw new IOException("Failed to upload image to Imgur: " + jsonObject.toString());
                }
            }
        }
    }
}
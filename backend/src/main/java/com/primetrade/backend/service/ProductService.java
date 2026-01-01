package com.primetrade.backend.service;

import com.primetrade.backend.exception.ResourceNotFoundException;
import com.primetrade.backend.model.Product;
import com.primetrade.backend.repository.IProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {
    private final IProductRepository repo;

    public ProductService(IProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product create(Product p) {
        return repo.save(p);
    }

    public Product update(Long id, Product p) {
        Product prod = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        prod.setName(p.getName());
        prod.setDescription(p.getDescription());
        prod.setPrice(p.getPrice());
        return repo.save(prod);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

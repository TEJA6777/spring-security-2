package com.primetrade.backend.repository;

import com.primetrade.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Long> {
}

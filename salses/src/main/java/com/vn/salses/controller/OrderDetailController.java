package com.vn.salses.controller;

import com.vn.salses.entity.OrderDetail;
import com.vn.salses.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/order-details")
@CrossOrigin(origins = "*")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping
    public ResponseEntity<List<OrderDetail>> getAllOrderDetails() {
        return ResponseEntity.ok(orderDetailService.getAllOrderDetails());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
        Optional<OrderDetail> orderDetail = orderDetailService.getOrderDetailById(id);
        return orderDetail.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderDetail>> getByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderDetailService.getOrderDetailsByOrderId(orderId));
    }

    @PostMapping
    public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetail orderDetail) {
        return ResponseEntity.ok(orderDetailService.saveOrderDetail(orderDetail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetail orderDetail) {
        if (!orderDetailService.getOrderDetailById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        orderDetail.setId(id);
        return ResponseEntity.ok(orderDetailService.saveOrderDetail(orderDetail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Long id) {
        if (!orderDetailService.getOrderDetailById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.noContent().build();
    }
}

package com.ifood.demo.order;

import java.util.Collection;
import java.util.Date;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface OrderRepository extends CrudRepository<Order, UUID> {

	@RestResource(path = "byClientId")
	Collection<Order> findByClientId(@Param("clientId") UUID clientId);

	@RestResource(path = "byOrderId")
	Order findOrderById(@Param("id") UUID id);
	
	@RestResource(path = "byDate")
	Collection<Order> findByCreatedAtBetween(@Param("start") Date start, @Param("end") Date end);
}
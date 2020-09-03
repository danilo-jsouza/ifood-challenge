package com.ifood.demo.client;

import java.util.Collection;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;


public interface ClientRepository extends CrudRepository<Client, UUID> {

	@RestResource(path = "filters")
	Collection<Client> findByNameOrPhoneOrEmail(@Param("name") String name, @Param("phone") String phone, @Param("email") String email);

	@RestResource(path = "byId")
	Client findById (@Param("id") UUID id);

}
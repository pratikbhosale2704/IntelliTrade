-include .env

deploy-sepolia:
	forge script script/deployintellitrade.s.sol:Deployintellitrade \
		--rpc-url $(SEPOLIA_RPC_URL) \
		--private-key $(SEPOLIA_PRIVATE_KEY) \
		--broadcast \
		-vvvv

deploy-polygon:
	forge script script/deployintellitrade.s.sol:Deployintellitrade \
		--rpc-url $(POLYGON_RPC_URL) \
		--private-key $(PLOYGON_PRIVATE_KEY) \
		--broadcast \
		-vvvv

#  0x37F3297cCE23F31358a3B7A5265711AC3E4D9510
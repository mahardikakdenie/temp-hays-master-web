# ====================================================
# 🐳 DOCKER COMPOSE COMMANDS
# ====================================================

# Pull latest changes, build containers, and clean up unused images
.PHONY: deploy-dev
deploy-dev:
	@echo "📦 Pulling latest resources from git..."
	@git pull

	@echo "🔧 Building and starting development container..."
	docker compose -f docker-compose-dev.yml -p gallery-cms-dev up -d --build --force-recreate

	@echo "🧹 Cleaning up unused Docker images..."
	@docker image prune -f

.PHONY: deploy-stag
deploy-stag:
	@echo "📦 Pulling latest resources from git..."
	@git pull

	@echo "🔧 Building and starting staging container..."
	docker compose -f docker-compose-stag.yml -p gallery-cms-stag up -d --build --force-recreate

	@echo "🧹 Cleaning up unused Docker images..."
	@docker image prune -f

.PHONY: deploy-prod
deploy-prod:
	@echo "📦 Pulling latest resources from git..."
	@git pull

	@echo "🔧 Building and starting production container..."
	docker compose -f docker-compose-prod.yml -p gallery-cms-prod up -d --build --force-recreate

	@echo "🧹 Cleaning up unused Docker images..."
	@docker image prune -f

# Restart containers
.PHONY: restart-dev
restart-dev:
	@echo "🚀 Restarting development container..."
	docker compose -f docker-compose-dev.yml -p gallery-cms-dev up -d

.PHONY: restart-stag
restart-stag:
	@echo "🚀 Restarting staging container..."
	docker compose -f docker-compose-stag.yml -p gallery-cms-stag up -d

.PHONY: restart-prod
restart-prod:
	@echo "🚀 Restarting production container..."
	docker compose -f docker-compose-prod.yml -p gallery-cms-prod up -d	
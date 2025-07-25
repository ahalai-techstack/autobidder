# Role-Based Access Control (RBAC) System

## Overview

This is a simple role-based access control system that allows you to protect endpoints with role-based decorators.

## How it works

1. **Role Entity**: Stores roles in the database (admin, manager, user, etc.)
2. **User Entity**: Updated to include a `roleId` field linking users to roles
3. **RolesGuard**: Checks if the authenticated user has the required role(s)
4. **@Roles() Decorator**: Applied to endpoints to specify required roles

## Usage

### 1. Create roles in the database

First, you need to create roles using the Role API:

```http
POST /roles
{
  "name": "admin",
  "description": "Administrator role"
}

POST /roles
{
  "name": "manager",
  "description": "Manager role"
}

POST /roles
{
  "name": "user",
  "description": "Regular user role"
}
```

### 2. Assign roles to users

Update users to have a roleId (you'll need to modify user creation/update logic):

```typescript
// In user service
async assignRole(userId: string, roleId: string) {
  await this.userRepository.update(userId, { roleId });
}
```

### 3. Protect endpoints with roles

Use the `@Roles()` decorator on your controller methods:

```typescript
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('car-brands')
@UseGuards(RolesGuard)
export class CarBrandController {
  @Get() // No role required - accessible to all authenticated users
  async findAll() {
    // ...
  }

  @Post()
  @Roles('admin', 'manager') // Only admin or manager can create
  async create(@Body() dto: CreateCarBrandDto) {
    // ...
  }

  @Delete(':id')
  @Roles('admin') // Only admin can delete
  async delete(@Param('id') id: string) {
    // ...
  }
}
```

## Available Endpoints

### Roles Management (Admin only)

- `GET /roles` - List all roles
- `GET /roles/:id` - Get role by ID
- `POST /roles` - Create new role
- `PATCH /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

### Example: Car Brands (with role protection)

- `GET /car-brands` - Accessible to all authenticated users
- `POST /car-brands` - Requires 'admin' or 'manager' role
- `PATCH /car-brands/:id` - Requires 'admin' role
- `DELETE /car-brands/:id` - Requires 'admin' role

## Testing the System

1. Create some roles via the API
2. Assign a role to a user (update user.roleId)
3. Login to get a JWT token
4. Try accessing protected endpoints with different roles
5. You should get 403 Forbidden if you don't have the required role

## Implementation Notes

- The system uses JWT authentication + role-based authorization
- Roles are checked against the authenticated user's role
- If no `@Roles()` decorator is present, the endpoint is accessible to all authenticated users
- The RolesGuard is imported and used per controller (not globally applied)
- Users can have only one role (many-to-one relationship)

## Future Enhancements

- Permission-based access (more granular than roles)
- Role hierarchy (admin inherits manager permissions)
- Multiple roles per user
- Dynamic permission assignment

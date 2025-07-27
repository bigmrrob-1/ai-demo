# Example: Shopping Cart Implementation

This example demonstrates how the orchestrator agent would handle a complex, multi-component task.

## Task: "Implement a shopping cart feature"

### Step 1: Orchestrator Analysis

The orchestrator receives the task and identifies required components:
- Database tables for cart storage
- API endpoints for cart operations
- UI components for cart display
- State management for cart data

### Step 2: File Mapping

The orchestrator determines affected areas:
```
/packages/db/schema/cart.ts          → @data-agent
/apps/api/src/routes/cart.ts         → @api-agent
/apps/web/src/components/Cart.tsx    → @ui-agent
/packages/ui/src/CartIcon.tsx        → @ui-agent
```

### Step 3: Task Delegation

#### To @data-agent:
```
Create a cart schema with:
- cart_items table with userId, productId, quantity
- Proper foreign key relationships
- Indexes for performance
```

#### To @api-agent:
```
Implement cart API endpoints:
- GET /api/cart - retrieve user's cart
- POST /api/cart/items - add item to cart
- PUT /api/cart/items/:id - update quantity
- DELETE /api/cart/items/:id - remove item
Include proper authentication and validation
```

#### To @ui-agent:
```
Create cart UI components:
- CartIcon component showing item count
- CartDrawer component for cart details
- Integration with cart API endpoints
- Optimistic updates for better UX
```

### Step 4: Coordination

The orchestrator ensures proper sequencing:
1. Database schema first (foundation)
2. API endpoints second (business logic)
3. UI components last (user interface)

### Step 5: Result Synthesis

The orchestrator reports back:
"Shopping cart feature implemented:
- ✓ Database schema created
- ✓ 4 API endpoints implemented
- ✓ Cart UI components added
- ✓ Full integration tested"

## Key Insights

1. **Separation of Concerns**: Each agent focuses on its specialty
2. **Clear Boundaries**: No agent steps outside its domain
3. **Efficient Execution**: Parallel work where possible
4. **Quality Assurance**: Each agent applies domain-specific best practices
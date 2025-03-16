import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Trash, Pencil } from 'lucide-react';
import { mockInventory } from '@/lib/mock-data';

export function Inventory() {
  // Handle viewing an item
  const handleViewItem = (itemId) => {
    const item = mockInventory.find((item) => item.id === itemId);
    if (item) {
      console.log("Viewing item:", item);
      // You can open a modal or navigate to a detailed view here
    }
  };

  // Handle deleting an item
  const handleDeleteItem = (itemId) => {
    console.log("Deleting item with ID:", itemId);
    // Implement delete functionality here
  };

  // Handle editing an item
  const handleEditItem = (itemId) => {
    const item = mockInventory.find((item) => item.id === itemId);
    if (item) {
      console.log("Editing item:", item);
      // Open a modal or form for editing
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead> {/* New Action Column */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {/* View Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewItem(item.id)}
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>

                    {/* Edit Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditItem(item.id)}
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
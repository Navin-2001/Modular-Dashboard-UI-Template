import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  SlidersHorizontal,
  UserCircle,
  Mail,
  Building2,
  Briefcase,
  ChevronDown,
  Users,
  Download,
  Pencil,
} from "lucide-react";
import { mockEmployees } from "@/lib/mock-data";
import { EmployeeFormDialog } from "@/components/employee-form-dialog";

export function Employees() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);

  // Get unique departments for filter options
  const departments = [...new Set(employees.map((emp) => emp.department))];

  // Handle saving employee (both add and update)
  const handleSaveEmployee = (employeeData) => {
    const existingIndex = employees.findIndex((e) => e.id === employeeData.id);

    if (existingIndex >= 0) {
      // Update existing employee
      const updatedEmployees = [...employees];
      updatedEmployees[existingIndex] = employeeData;
      setEmployees(updatedEmployees);
    } else {
      // Add new employee
      setEmployees([...employees, employeeData]);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 w-full">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Employees
                </p>
                <h3 className="text-3xl font-bold">{employees.length}</h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Active Employees
                </p>
                <h3 className="text-3xl font-bold">
                  {employees.filter((emp) => emp.status === "active").length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <UserCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Departments</p>
                <h3 className="text-3xl font-bold">{departments.length}</h3>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Title and action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <Users className="mr-2 h-6 w-6" />
            Employees
            <Badge className="ml-3">{employees.length}</Badge>
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your company's employee directory
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <EmployeeFormDialog
            onSaveEmployee={handleSaveEmployee}
            departments={departments}
            triggerButton={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            }
          />
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search employees by name, email, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-between min-w-[180px]"
                onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
              >
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4 text-gray-500" />
                  Department
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
              <Button variant="outline" className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4 text-gray-500" />
                More Filters
              </Button>
            </div>
          </div>

          {showDepartmentFilter && (
            <div className="mt-3 flex flex-wrap gap-2">
              {departments.map((dept) => (
                <Badge key={dept} variant="outline" className="cursor-pointer">
                  {dept}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <div className="rounded-md overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">Position</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-gray-500" />
                    {employee.name}
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "active" ? "success" : "destructive"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

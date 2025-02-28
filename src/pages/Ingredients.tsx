
import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Pencil, Trash2, Search, Upload } from 'lucide-react';
import { MacroInfo, Ingredient } from '@/types/meals';
import { useIngredients } from '@/hooks/useIngredients';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { supabase } from '@/integrations/supabase/client';

const Ingredients = () => {
  const { toast } = useToast();
  const { ingredients, loading, addIngredient, updateIngredient, deleteIngredient, refreshIngredients } = useIngredients();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    grams: 100,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);

  const filteredIngredients = useMemo(() => {
    return ingredients.filter(
      (ingredient) => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [ingredients, searchTerm]);

  const resetNewIngredient = () => {
    setNewIngredient({
      name: '',
      grams: 100,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      image_url: ''
    });
  };

  const handleOpenEditDialog = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (ingredient: Ingredient) => {
    setCurrentIngredient(ingredient);
    setIsDeleteDialogOpen(true);
  };

  const handleAddIngredient = async () => {
    if (!newIngredient.name) {
      toast({
        title: 'Validation Error',
        description: 'Ingredient name is required',
        variant: 'destructive',
      });
      return;
    }

    const ingredientToAdd: Omit<Ingredient, 'id' | 'is_default' | 'user_id'> = {
      name: newIngredient.name,
      grams: Number(newIngredient.grams),
      macros: {
        calories: Number(newIngredient.calories),
        protein: Number(newIngredient.protein),
        carbs: Number(newIngredient.carbs),
        fat: Number(newIngredient.fat),
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      },
      image_url: newIngredient.image_url
    };

    const result = await addIngredient(ingredientToAdd);
    if (result) {
      toast({
        title: 'Success',
        description: 'Ingredient added successfully',
      });
      setIsAddDialogOpen(false);
      resetNewIngredient();
    }
  };

  const handleUpdateIngredient = async () => {
    if (!currentIngredient) return;

    const updatedIngredient: Partial<Omit<Ingredient, 'id' | 'is_default' | 'user_id'>> = {
      name: currentIngredient.name,
      grams: currentIngredient.grams,
      macros: {
        calories: currentIngredient.macros.calories,
        protein: currentIngredient.macros.protein,
        carbs: currentIngredient.macros.carbs,
        fat: currentIngredient.macros.fat,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      },
      image_url: currentIngredient.image_url
    };

    const result = await updateIngredient(currentIngredient.id, updatedIngredient);
    if (result) {
      toast({
        title: 'Success',
        description: 'Ingredient updated successfully',
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteIngredient = async () => {
    if (!currentIngredient) return;

    const result = await deleteIngredient(currentIngredient.id);
    if (result) {
      toast({
        title: 'Success',
        description: 'Ingredient deleted successfully',
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleIngredientImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, isNewIngredient: boolean) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `ingredients/${fileName}`;
      
      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) throw error;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      if (isNewIngredient) {
        setNewIngredient({
          ...newIngredient,
          image_url: publicUrl
        });
      } else if (currentIngredient) {
        setCurrentIngredient({
          ...currentIngredient,
          image_url: publicUrl
        });
      }
      
      toast({
        title: "Image uploaded",
        description: "Your image has been successfully uploaded.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ingredients</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Ingredient
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading ingredients...</div>
      ) : (
        <div className="overflow-auto rounded-lg border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Portion (g)</TableHead>
                <TableHead className="text-right">Calories</TableHead>
                <TableHead className="text-right">Protein (g)</TableHead>
                <TableHead className="text-right">Carbs (g)</TableHead>
                <TableHead className="text-right">Fat (g)</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={ingredient.image_url || '/placeholder.svg'}
                          alt={ingredient.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{ingredient.name}</TableCell>
                    <TableCell className="text-right">{ingredient.grams}</TableCell>
                    <TableCell className="text-right">{ingredient.macros.calories}</TableCell>
                    <TableCell className="text-right">{ingredient.macros.protein}</TableCell>
                    <TableCell className="text-right">{ingredient.macros.carbs}</TableCell>
                    <TableCell className="text-right">{ingredient.macros.fat}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEditDialog(ingredient)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDeleteDialog(ingredient)}
                          disabled={ingredient.is_default}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No ingredients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Ingredient Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Ingredient</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="mb-4">
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 rounded-md overflow-hidden border relative group">
                  <img
                    src={newIngredient.image_url || '/placeholder.svg'}
                    alt="Ingredient"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleIngredientImageUpload(e, true)}
                        disabled={uploading}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-white border-white hover:bg-white/20 hover:text-white"
                        disabled={uploading}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grams" className="text-right">
                    Grams
                  </Label>
                  <Input
                    id="grams"
                    type="number"
                    value={newIngredient.grams}
                    onChange={(e) => setNewIngredient({ ...newIngredient, grams: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="calories" className="text-right">
                    Calories
                  </Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newIngredient.calories}
                    onChange={(e) => setNewIngredient({ ...newIngredient, calories: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="protein" className="text-right">
                    Protein (g)
                  </Label>
                  <Input
                    id="protein"
                    type="number"
                    value={newIngredient.protein}
                    onChange={(e) => setNewIngredient({ ...newIngredient, protein: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="carbs" className="text-right">
                    Carbs (g)
                  </Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={newIngredient.carbs}
                    onChange={(e) => setNewIngredient({ ...newIngredient, carbs: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fat" className="text-right">
                    Fat (g)
                  </Label>
                  <Input
                    id="fat"
                    type="number"
                    value={newIngredient.fat}
                    onChange={(e) => setNewIngredient({ ...newIngredient, fat: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddIngredient}>Add Ingredient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Ingredient Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ingredient</DialogTitle>
          </DialogHeader>
          {currentIngredient && (
            <div className="grid gap-4 py-4">
              <div className="mb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 rounded-md overflow-hidden border relative group">
                    <img
                      src={currentIngredient.image_url || '/placeholder.svg'}
                      alt={currentIngredient.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleIngredientImageUpload(e, false)}
                          disabled={uploading}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-white border-white hover:bg-white/20 hover:text-white"
                          disabled={uploading}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {uploading ? "Uploading..." : "Change Image"}
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="edit-name"
                      value={currentIngredient.name}
                      onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-grams" className="text-right">
                      Grams
                    </Label>
                    <Input
                      id="edit-grams"
                      type="number"
                      value={currentIngredient.grams}
                      onChange={(e) => setCurrentIngredient({ ...currentIngredient, grams: Number(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-calories" className="text-right">
                      Calories
                    </Label>
                    <Input
                      id="edit-calories"
                      type="number"
                      value={currentIngredient.macros.calories}
                      onChange={(e) => setCurrentIngredient({
                        ...currentIngredient,
                        macros: {
                          ...currentIngredient.macros,
                          calories: Number(e.target.value)
                        }
                      })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-protein" className="text-right">
                      Protein (g)
                    </Label>
                    <Input
                      id="edit-protein"
                      type="number"
                      value={currentIngredient.macros.protein}
                      onChange={(e) => setCurrentIngredient({
                        ...currentIngredient,
                        macros: {
                          ...currentIngredient.macros,
                          protein: Number(e.target.value)
                        }
                      })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-carbs" className="text-right">
                      Carbs (g)
                    </Label>
                    <Input
                      id="edit-carbs"
                      type="number"
                      value={currentIngredient.macros.carbs}
                      onChange={(e) => setCurrentIngredient({
                        ...currentIngredient,
                        macros: {
                          ...currentIngredient.macros,
                          carbs: Number(e.target.value)
                        }
                      })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-fat" className="text-right">
                      Fat (g)
                    </Label>
                    <Input
                      id="edit-fat"
                      type="number"
                      value={currentIngredient.macros.fat}
                      onChange={(e) => setCurrentIngredient({
                        ...currentIngredient,
                        macros: {
                          ...currentIngredient.macros,
                          fat: Number(e.target.value)
                        }
                      })}
                      className="col-span-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateIngredient}>Update Ingredient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Ingredient Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the ingredient "{currentIngredient?.name}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteIngredient}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ingredients;

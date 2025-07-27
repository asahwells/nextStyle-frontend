import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-sm">
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
          <DialogDescription>Find your perfect fit with our detailed size chart.</DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Chest (in)</TableHead>
                <TableHead>Waist (in)</TableHead>
                <TableHead>Hips (in)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>XS</TableCell>
                <TableCell>32-34</TableCell>
                <TableCell>26-28</TableCell>
                <TableCell>32-34</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>S</TableCell>
                <TableCell>34-36</TableCell>
                <TableCell>28-30</TableCell>
                <TableCell>34-36</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>M</TableCell>
                <TableCell>36-38</TableCell>
                <TableCell>30-32</TableCell>
                <TableCell>36-38</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>L</TableCell>
                <TableCell>38-40</TableCell>
                <TableCell>32-34</TableCell>
                <TableCell>38-40</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>XL</TableCell>
                <TableCell>40-42</TableCell>
                <TableCell>34-36</TableCell>
                <TableCell>40-42</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          All measurements are in inches. Please note that this is a general guide, and sizes may vary slightly between
          brands.
        </p>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  Calendar,
  Star,
  User,
  Search,
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getReviews, type Review } from "@/lib/supabase/reviews"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ReviewsManagementProps = {
  onUpdate?: () => void
}

export default function ReviewsManagement({ onUpdate }: ReviewsManagementProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [sortField, setSortField] = useState<keyof Review | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchReviews = async () => {
      const allReviews = await getReviews()
      setReviews(allReviews)
      onUpdate?.() // Safe optional call
    }
    fetchReviews()
  }, [])

  const handleSort = (field: keyof Review) => {
    const isSameField = field === sortField
    const direction = isSameField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(direction)
  }

  const filteredReviews = reviews
    .filter((review) =>
      filter === "all" || review.service === filter
    )
    .filter((review) =>
      review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0
      const valueA = a[sortField]
      const valueB = b[sortField]
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      }
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA
      }
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Review Management</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="therapy">Therapy</SelectItem>
              <SelectItem value="rehab">Rehab</SelectItem>
              <SelectItem value="home-visit">Home Visit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                Name {sortField === "name" && (sortDirection === "asc" ? <ArrowUpIcon className="inline w-4 h-4" /> : <ArrowDownIcon className="inline w-4 h-4" />)}
              </TableHead>
              <TableHead>Service</TableHead>
              <TableHead onClick={() => handleSort("rating")} className="cursor-pointer">
                Rating {sortField === "rating" && (sortDirection === "asc" ? <ArrowUpIcon className="inline w-4 h-4" /> : <ArrowDownIcon className="inline w-4 h-4" />)}
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg`} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  {review.name || "Anonymous"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{review.service || "N/A"}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(review.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="max-w-sm truncate text-muted-foreground">
                  {review.comment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredReviews.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">No reviews found.</div>
        )}
      </div>
    </div>
  )
}

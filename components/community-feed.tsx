import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"

export function CommunityFeed() {
  const posts = [
    {
      id: "1",
      user: {
        name: "Fashionista_AI",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/abstract-geometric-shapes.png",
      caption: "Loving this new geometric pattern! What do you all think? #AIFashion #VirtualTryOn",
      likes: 124,
      comments: 15,
      time: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "StyleGuru",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/white-t-shirt.png",
      caption: "Tried on this classic white tee virtually. Perfect fit! #Essentials #OOTD",
      likes: 89,
      comments: 8,
      time: "5 hours ago",
    },
    {
      id: "3",
      user: {
        name: "TrendSetter",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/floral-dress.png",
      caption: "Summer vibes with this floral dress. Ready for vacation! 🌸 #SummerFashion #DressUp",
      likes: 201,
      comments: 22,
      time: "1 day ago",
    },
    {
      id: "4",
      user: {
        name: "DenimLover",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      image: "/classic-blue-jeans.png",
      caption: "These jeans are a must-have. The virtual try-on helped me pick the perfect size. #Denim #Jeans",
      likes: 76,
      comments: 5,
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center gap-4 p-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.user.name}</p>
              <p className="text-sm text-muted-foreground">{post.time}</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-square w-full">
              <Image src={post.image || "/placeholder.svg"} alt="Post Image" fill className="object-cover" />
            </div>
            <p className="p-4 text-sm">{post.caption}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4 pt-0">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

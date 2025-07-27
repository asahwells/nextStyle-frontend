import { CommunityFeed } from "@/components/community-feed"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container py-8 lg:py-12">
      <div className="flex flex-col gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Join the NextStyle Community</h1>
          <p className="max-w-[700px] text-lg text-muted-foreground mx-auto">
            Share your virtual try-ons, get feedback, and connect with fashion enthusiasts.
          </p>
        </div>

        {/* Post Creation Section */}
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          <form className="space-y-4">
            <div>
              <Label htmlFor="post-text">What's on your mind?</Label>
              <Textarea id="post-text" placeholder="Share your latest try-on or fashion thoughts..." rows={4} />
            </div>
            <div>
              <Label htmlFor="image-upload">Upload Image (Optional)</Label>
              <Input id="image-upload" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Post to Community
            </Button>
          </form>
        </div>

        {/* Community Feed Section */}
        <CommunityFeed />
      </div>
    </div>
  )
}

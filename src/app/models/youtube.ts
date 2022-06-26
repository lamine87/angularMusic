export interface Youtube {
  id: string,
  snippet:{
    title: string,
    description: string,
    publishedAt: string,
    thumbnails:{
      high: {
        url: string
      }
    }
  }
  contentDetails: {
    upload: {
      videoId: string
    }
  }



}


import Container from "../components/container"
import { AlbumsFilter } from "../contexts/albums/components/albums-filter"
import { PhotosList } from "../contexts/photos/components/photos-list"

export function PageHome() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "32564", title: "Album 1" },
          { id: "98547", title: "Album 2" },
          { id: "11425", title: "Album 3" },
        ]}
        className="mb-9"
      />
      <PhotosList
        photos={[
          {
            id: "12452",
            title: "Teste",
            imageId: "portrait-tower.png",
            alt: "Teste de photo",
            albums: [
              { id: "32564", title: "Album 1" },
              { id: "98547", title: "Album 2" },
              { id: "11425", title: "Album 3" },
            ],
          },
          {
            id: "4587",
            title: "Teste",
            imageId: "portrait-tower.png",
            alt: "Teste de photo",
            albums: [
              { id: "32564", title: "Album 1" },
              { id: "98547", title: "Album 2" },
              { id: "11425", title: "Album 3" },
            ],
          },
        ]}
      />
    </Container>
  )
}

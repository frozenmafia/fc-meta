
import { BlogGetData } from '@/app/models/BlogGet'
import { Stack, Chip, Typography } from '@mui/material'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react'

const TagOutput = ({tags, col}:{tags:any, col?:string}) => {
  const colToUse = col || "black";

  return (
    <>
       {tags.length > 0 && (
      <div>
        {/* <h1>Tags</h1> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {tags.map((tag: { id: Key | null | undefined; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }) => (
            <Chip
              key={tag.id}
              label={
                <Typography variant="subtitle1" color={colToUse}>
                  {tag.text}
                </Typography>
              }
              variant="outlined"
              style={{ margin: "4px", borderRadius: 0 }}
            />
          ))}
        </Stack>
      </div>
    )}
    </>
 
  )
}

export default TagOutput
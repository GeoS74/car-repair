export default function Author({ author }: IDoc) {
  return <div className="mt-4"><small>автор: {author.name}</small></div>
}
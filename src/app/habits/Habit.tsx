import LayoutContent from "../../components/LayoutContent";
import { faker } from "@faker-js/faker";

const data: any[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    id: faker.database.mongodbObjectId(),
    category: "",
    name: faker.internet.emoji() + " " + faker.lorem.lines({ min: 1, max: 2 }),
  });
}

function Habit() {
  
  return (
    <LayoutContent>
      <div className="container px-4 py-4 mx-auto">
        {
          data.map(item => (
            <div className="p-4 my-2 border rounded-md shadow-sm" key={item.id}>
              <h5 className="">{item.name}</h5>
            </div>
          ))
        }
      </div>
    </LayoutContent>
  );
}

export default Habit;

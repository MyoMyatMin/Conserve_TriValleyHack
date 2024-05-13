const createFoodRecord = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { data } = req.body;

    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const existingRecord = await foodRecord.findOne({
      user_id: user_id,
      createdAt: { $gte: startOfToday },
    });

    if (existingRecord) {
      await foodRecord.updateOne(
        { _id: existingRecord._id },
        { $set: { data: data } }
      );
      res.status(200).json({ message: "Food record updated successfully" });
    } else {
      const newRecord = new foodRecord({
        user_id: user_id,
        data: data,
      });
      const resultRecord = await newRecord.save();
      console.log(resultRecord);
      const existingDailyRecord = await DailyTotalRecord.findOne({
        user_id: user_id,
        createdAt: { $gte: startOfToday },
      });

      if (existingDailyRecord) {
        await DailyTotalRecord.updateOne(
          { _id: existingDailyRecord._id },
          {
            $set: {
              data: existingDailyRecord.data + resultRecord.data,
              is_conserve: existingDailyRecord.data + resultRecord.data < 1000,
            },
          }
        );
      } else {
        const newTotalRecord = new DailyTotalRecord({
          user_id: user_id,
          data: resultRecord.data,
          is_conserve: resultRecord.data < 1000,
          food_id: resultRecord._id,
        });
        await newTotalRecord.save();
      }
      res.status(201).json({ message: "Food record created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

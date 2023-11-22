import { create } from "zustand";
import { persist } from "zustand/middleware";



export interface AccountStore {
    accountDate: Array<any>;

    handleDelete: (_: string) => void
}

export const useAccountStore = create<AccountStore>()(
    persist(
        (set,get) => ({
            accountDate: [
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                sex: '男',
                address: '成都',
                avater: 'avaterUrl',
                likes: '小猫',
                motto: 'abcdefg'
              },
              {
                key: '2',
                name: 'John Brown',
                age: 32,
                sex: '男',
                address: '成都',
                avater: 'avaterUrl',
                likes: '小猫',
                motto: 'abcdefg'
              },
            ],

              handleDelete(key) {
                alert(`删除成功，${key}号账号已删除`)
                console.log(key)
              }
        }),
        {
            name: 'AccountStore',
            version: 1,
        }
    )
)